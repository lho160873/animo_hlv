package animo.service;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import animo.dao.GraphJdbc;

import java.util.*;

/**
 * Created by Lida on 18.03.2019.
 */
@Service
public class GraphService {
    private static final Logger logger = LogManager.getLogger(GraphService.class);

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private GraphJdbc graphJdbc;



    public List<Map<String, Object>> loadConnections(Integer subjAreaId) {
        return graphJdbc.loadConnections(subjAreaId);
    }

    public List<Map<String, Object>> loadDefinitonGood(Integer subjAreaId) {
        return graphJdbc.loadDefinitonGood(subjAreaId);
    }

    public List<Map<String, Object>> loadDefinitonBad(Integer subjAreaId) {
        return graphJdbc.loadDefinitonBad(subjAreaId);
    }

    public Boolean buildGraph(Integer subjAreaId)
    {
        return graphJdbc.startBuild( subjAreaId ) ;
    }

    public String startGraph(Integer subjAreaId,List<Map<String, Object>> lGraphIdea,List<Map<String, Object>> lGraphJoin)
    {
        Integer ssArea = -1;
        Integer vIdn = -1;
        Boolean bDebug = false;

        if ( ! graphJdbc.start( subjAreaId , ssArea, vIdn, lGraphIdea, lGraphJoin, bDebug ) ) return "false";

        if (lGraphIdea.size()>0)
        return lGraphIdea.get(6).get("iLevel").toString();
        else
            return "0";

    }

}
