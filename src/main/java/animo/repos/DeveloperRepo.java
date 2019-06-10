package animo.repos;

import org.springframework.data.repository.CrudRepository;
import animo.domain.Developer;

import java.util.List;

public interface DeveloperRepo extends CrudRepository<Developer, Integer> {
    List<Developer> findByFio(String fio);
    List<Developer> findByDeveloperId(Integer id);

}
