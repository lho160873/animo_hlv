package animo.dao;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;
import animo.common.TAnaliz;
import animo.domain.BillingRefOldLow;
import animo.domain.DefinitionTbl;
import animo.domain.RefOldLow;
import animo.repos.DefinitionTblRepo;
import animo.repos.RefOldLowRepo;

import java.util.*;

/**
 * Created by Lida on 18.03.2019.
 */
@Configuration
public class GraphJdbc {

    private static final Logger logger = LogManager.getLogger(GraphJdbc.class);

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private DefinitionTblRepo definitionTblRepo;

    @Autowired
    private RefOldLowRepo refOldLowRepo;



    public String loadConnections_test(Integer subjAreaId)
    {
        logger.info("loadConnections_test()");
        if ( jdbcTemplate !=null ) {
            List<Map<String, Object>> l = jdbcTemplate.queryForList("SELECT id FROM message");
            return ((Integer) l.get(0).get("id")).toString();
        }
        else
            return  "ERROR";
    }
    public List<Map<String, Object>> loadConnections(Integer subjAreaId)
    {
        logger.info("loadConnections()");
        if (subjAreaId == null)
        {
            subjAreaId = -1;
        }

        String sql = "select p.idn_old, p.idn_low from ref_old_low as p inner join definition as d1 on d1.idn = p.idn_old"
                + " inner join  definition as d2  on d2.idn = p.idn_low"
               // + " where d1.subj_area_id = "+ subjAreaId.toString()+" and d2.subj_area_id = "+ subjAreaId.toString();
                + " where d1.subj_area_id = ? and d2.subj_area_id = ?";

        return jdbcTemplate.queryForList( sql, new Object[] { subjAreaId,subjAreaId });
    }

    public List<Map<String, Object>> loadDefinitonGood(Integer subjAreaId)
    {
        logger.info("loadDefinitonGood()");
        if (subjAreaId == null)
        {
            subjAreaId = -1;
        }

        String sql = " select m.idn as id, m.name,  m.num_urov "
            +" from definition as m where m.subj_area_id="+subjAreaId.toString()+" and m.num_urov<>0 order by m.num_urov";

        return jdbcTemplate.queryForList(sql);
    }
    public List<Map<String, Object>> loadDefinitonBad(Integer subjAreaId)
    {
        logger.info("loadDefinitonBad()");
        if (subjAreaId == null)
        {
            subjAreaId = -1;
        }

        String sql = " select m.idn as id, m.name,  m.num_urov "
                +" from definition as m where m.subj_area_id="+subjAreaId.toString()+" and m.num_urov=0 ";

        return jdbcTemplate.queryForList(sql);
    }

    public Boolean startBuild(Integer subjAreaId) {
        List<Map<String, Object>> lGraphIdea = new ArrayList<>();
        List<Map<String, Object>> lGraphJoin = new ArrayList<>();
        Integer ssArea = -1;
        Integer vIdn = -1;
        //List<Map<String, Object>> lGraphIdea = new ArrayList<>();
        //List<Map<String, Object>> lGraphJoin = new ArrayList<>();
        Boolean bDebug = false;

        Boolean res = start( subjAreaId , ssArea, vIdn, lGraphIdea, lGraphJoin, bDebug ) ;

        //сохраняем результаты в БД
        for (Map<String, Object> obj:lGraphIdea)
        {

            Integer idn = (Integer) obj.get("iIdea");
            short numUrov = (short) obj.get("iLevel");
            List<DefinitionTbl> defForEdit = definitionTblRepo.findByIdn(idn);
            defForEdit.get(0).setNumUrov(numUrov);

            definitionTblRepo.save(defForEdit.get(0));
        }

        List<RefOldLow> refForDel = refOldLowRepo.findBySubjAreaId( subjAreaId);
        refOldLowRepo.deleteAll(refForDel);

        for (Map<String, Object> join:lGraphJoin)
        {
            Integer idnLow = (Integer) join.get("iJoin");
            Integer idnOld = (Integer) join.get("iIdea");

            BillingRefOldLow billingRefOldLow = new BillingRefOldLow(idnOld,idnLow);
            RefOldLow ref = new RefOldLow(billingRefOldLow);

            ref.setSubjAreaId(subjAreaId);
            refOldLowRepo.save(ref);
        }

        return res;

    }

    public Boolean start(Integer sArea, Integer ssArea, Integer vIdn, List<Map<String, Object>> lGraphIdea, List<Map<String, Object>> lGraphJoin, Boolean bDebug )
    {
        TAnaliz tanaliz = new TAnaliz();

        List<Map<String, Object>> lIdea = new ArrayList<Map<String, Object>>(); //массив состоит из полей типа $newIdea
        List<Map<String, Object>>  lJoin = new ArrayList<Map<String, Object>>(); //массив состоит из полей типа $newJoin
        Boolean bSynonim = true; //с синонимами

        String  sQuery="SELECT m.idn, m.name FROM definition as m ";
        if ( ssArea!=-1 )
            sQuery +=" INNER JOIN sub_area_de as d on m.idn=d.idn";
        sQuery +=" WHERE m.subj_area_id="+ sArea.toString();
        if ( ssArea!=-1 )
            sQuery += " AND d.sub_subj_area_id=" + ssArea.toString();

        sQuery+=" ORDER BY m.idn";

        logger.info("sQuery = "+sQuery);

        List<Map<String, Object>> query = jdbcTemplate.queryForList(sQuery);

        Integer count = query.size();

        if( count == 0 ) return true;

        logger.info("count = "+count.toString() );

        Integer idn = -1;
        String sName;
        String sSql;
        String sTemp;
        String sSynonim;
        List<Map<String, Object>> qSynonim;
        String name_synonim;
        for (int i=0; i<query.size(); i++)
        {
            idn = (Integer)query.get(i).get("idn"); //текущий код понятия
            sName = (String)query.get(i).get("name"); //текущее понятие
            Map<String, Object> newIdea = new HashMap<String, Object>(); //массив для одной строки:
            // iIdea=>id понятия,
            // iLevel=>уровень понятия,
            // sName=>само поняти
            newIdea.put("iIdea", idn);
            newIdea.put("iLevel", 0);
            newIdea.put("sName",sName);
            lIdea.add(newIdea);


            sSql = "SELECT m.idn as idn FROM definition as m ";
            if ( ssArea!=-1 )
                sSql+=" INNER JOIN sub_area_def as d on m.idn=d.idn";
            sSql += " WHERE (";
             sTemp = tanaliz.textAnalize(sName);
                sSql += "lower(\' \'||m.descript_n||\' \') LIKE \'% "+sTemp+" %\'";
            if( bSynonim )                                          //с учетом синонимов
            {
                sSynonim = "SELECT name_synonim FROM synonims WHERE id_concept="+idn.toString();
                qSynonim =jdbcTemplate.queryForList(sSynonim);

                for (int j=0; j<qSynonim.size(); j++)
                {
                    name_synonim = tanaliz.textAnalize((String)qSynonim.get(j).get("name_synonim"));
                    sSql += " or lower(\' \'||m.descript_n||\' \') LIKE \'% "+name_synonim+" %\'";
                }
            }
             sSql += ") and m.subj_area_id="+ sArea.toString()+" and m.idn<>"+idn.toString();
            if ( ssArea!=-1 )
                sSql+=" AND d.sub_subj_area_id="+ssArea.toString();

            sSql += " ORDER BY m.idn";
            logger.info("sSql = "+sSql );

            List<Map<String, Object>>  qFind = jdbcTemplate.queryForList(sSql);
           for (int k=0; k<qFind.size(); k++)
            {
                Map<String, Object> newJoin = new HashMap<String, Object>(); //массив для одной строки:
                // iIdea=>id понятия которое содержиться в понятии с id равным iJoin
                // iJoin=>id понятия которое содержит понятие с id равным iIdea
                newJoin.put("iIdea", idn);
                newJoin.put("iJoin", qFind.get(k).get("idn"));

                lJoin.add(newJoin);
            }
        }
        sort_down( lIdea, lJoin, lGraphIdea, lGraphJoin, bDebug ); //назначение уровней для понятий

        ListIterator<Map<String,Object>> it = lIdea.listIterator();
        while (it.hasNext()) //переносим оставlиеся в списке понятий
        {
            Map<String,Object> obj = it.next();
            lGraphIdea.add(obj); //сохраняем для графического представления
            it.remove();         //удаляем из списка понятий
        }

        ListIterator<Map<String,Object>> itg = lJoin.listIterator();
        while (itg.hasNext())  //переносим оставlиеся в списке связи
        {
            Map<String,Object> obj = itg.next();
            lGraphJoin.add(obj); //сохраняем для графического представления
            itg.remove();        //удаляем из списка связей
        }

        return true;
    }


    //сортировка списка понятий по уровням (назначение уровней)
    public void sort_down( List<Map<String, Object>> lIdea, List<Map<String, Object>> lJoin, List<Map<String, Object>> lGraphIdea, List<Map<String, Object>> lGraphJoin, Boolean bDebug )
    {
        Integer iLvl = 0;
        Integer iCount = 0;

        while (lIdea.size()>0)
        {
            iLvl = iLvl + 1;
            iCount = lIdea.size();
            List<Object> lObj = new ArrayList<Object>();     //в этот массив будем складывать обработанные понятия
            for (Map<String, Object> elemIdea : lIdea) //перебираем все понятия
            {
                Boolean bTest = false;
                for (Map<String, Object> elemJoin : lJoin) //перебираем все связи
                {
                    if( elemIdea.get("iIdea").equals(elemJoin.get("iJoin")) )               //если ктото на нас ссылался
                    {
                        bTest = true;
                        break;                                                     //прерываем поиск
                    }
                }
                if( !bTest )                                                  //если ссылок не найдено
                    lObj.add(elemIdea.get("iIdea"));

                else //анализ связей
                {
                    List<Object> lNextIdea = new ArrayList<Object>();  //в этот массив будем складывать id-ы понятий, которые связанные между собой связями
                    lNextIdea.add(elemIdea.get("iIdea")); //положили id текущего понятия
                    if ( findLoop( lNextIdea, lJoin, bDebug ) ) //поиск петель (циклических зависитмостей)
                    {

                        Iterator it_lNextIdea = lNextIdea.iterator();
                        while (it_lNextIdea.hasNext())
                        {
                            Object currId = it_lNextIdea.next();
                            //удалим обработанные понятия из входного массива понятий
                            Iterator<Map<String, Object>> it_lIdea = lIdea.iterator();
                            while (it_lIdea.hasNext()) //перебираем все понятия
                            {
                                Map<String, Object> elemIde = it_lIdea.next();
                                if( elemIdea.get("iIdea").equals(currId) )
                                {
                                    lGraphIdea.add(elemIde); //положим обработанное панятие в окончательный массив для графического представление
                                    it_lIdea.remove(); //удаляем обработанное понятие из входного массива понятий
                                    break;
                                }
                            }
                            //удалим обработанные связи из входного массива связей
                            Iterator<Map<String, Object>> it_lJoin = lJoin.iterator();
                            while (it_lJoin.hasNext()) //перебираем все связи
                            {
                                Map<String, Object> elemJoin = it_lJoin.next();
                                if( elemJoin.get("iIdea").equals(currId) )
                                {
                                    lGraphJoin.add(elemJoin); //положим обработанные связи для графического представления
                                    it_lJoin.remove();//удаляем из списка
                                }
                            }
                            it_lNextIdea.remove(); //удаляем из списка
                        }
                    }//циклических связей не нашли
                }
            }
            Iterator it_lObj = lObj.iterator();
            while (it_lObj.hasNext())
            {

                Object currObjId =  it_lObj.next();

                Iterator<Map<String, Object>> it_lIde = lIdea.iterator();
                while (it_lIde.hasNext()) //перебираем все элементы
                {
                    Map<String, Object> elemIdea = it_lIde.next();
                    if( elemIdea.get("iIdea").equals((Integer)currObjId) )
                    {
                        Map<String, Object> newIdea = new HashMap<String, Object>(); //TIdea
                        newIdea = elemIdea;
                        newIdea.put("iLevel",iLvl);
                        lGraphIdea.add(newIdea);
                        it_lIde.remove();
                        break;
                    }
                }
                Iterator<Map<String, Object>> it_lJoin = lJoin.iterator();
                while (it_lJoin.hasNext()) //перебираем все связи
                {
                    Map<String, Object> elemJoin =  it_lJoin.next();
                    if( elemJoin.get("iIdea").equals(currObjId) )
                    {
                        lGraphJoin.add(elemJoin);
                        it_lJoin.remove(); //удаляем из списка
                        //break;
                    }
                }
                it_lObj.remove(); //удаляем текущее понятие из списка
            }
            if (lIdea!=null)
            if ( iCount.equals(lIdea.size())  )  //обнаружение зацикливаний
                break;
        }
    }

    //поиск петель (циклических зависитмостей)
    public Boolean findLoop( List<Object> lLoopIdea, List<Map<String, Object>> lJoin, Boolean bDebug )
    {
        Map<String, Object> fJoin = new HashMap<String, Object>();
        for (Map<String, Object> elemJoin : lJoin) //перебираем все связи
        {
            fJoin = elemJoin;

            ListIterator li = lLoopIdea.listIterator(lLoopIdea.size()); //переходим в конец массива
            Object lastLoop = li.previous(); //берем этот последний элемент массива $lLoopIdea
            if ( fJoin.get("iIdea").equals(lastLoop) )
            {
                List<Object> iRezArr = new ArrayList<Object>();
                for ( Object el : lLoopIdea)
                {
                    if (el.equals(fJoin.get("iJoin")) )
                    {
                        iRezArr.add(el);
                    }
                }
                Integer iRez = -1;
                if ( iRezArr.size() > 0 )
                    iRez = (Integer) iRezArr.get(0);
                if( iRez == -1 )                                                      //на список не ссылается
                {
                    List<Object> lNextIdea = new ArrayList<Object>();
                    lNextIdea.addAll(lLoopIdea);//копируем в др. массив
                    lNextIdea.add(fJoin.get("iJoin"));

                    if ( findLoop( lNextIdea, lJoin, bDebug ) )
                    {
                         lLoopIdea.clear(); //очистили массив
                        if ( lNextIdea.size() > 0 )
                            lLoopIdea.addAll(lNextIdea); //копируем весь цикл
                        return true;
                    }
                }
                else if( iRez == 0 )                                                  //цикл на верlину
                {
                    return true;
                }
                else
                {
                    lLoopIdea.clear(); //очистили массив
                    return true;
                }
            }
        }
        return false;
    }


}
