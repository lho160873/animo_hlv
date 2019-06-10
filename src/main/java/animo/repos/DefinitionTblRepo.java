package animo.repos;

import org.springframework.data.repository.CrudRepository;
import animo.domain.DefinitionTbl;

import java.util.List;

public interface DefinitionTblRepo extends CrudRepository<DefinitionTbl, Integer> {
    List<DefinitionTbl> findByName(String name);
    List<DefinitionTbl> findByDescription(String description);
    List<DefinitionTbl> findBySubjAreaId(Integer subj_area_id);
    List<DefinitionTbl> findByIdn(Integer idn);

}
