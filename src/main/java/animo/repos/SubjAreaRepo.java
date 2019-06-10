package animo.repos;

import org.springframework.data.repository.CrudRepository;
import animo.domain.SubjArea;

import java.util.List;

public interface SubjAreaRepo extends CrudRepository<SubjArea, Integer> {
    List<SubjArea> findByName(String name);
    List<SubjArea> findBySubjAreaId(Integer id);

}
