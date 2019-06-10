package animo.repos;

import org.springframework.data.repository.CrudRepository;
import animo.domain.BillingRefOldLow;
import animo.domain.RefOldLow;

import java.util.List;

public interface RefOldLowRepo extends CrudRepository<RefOldLow, BillingRefOldLow> {
    List<RefOldLow> findBySubjAreaId(Integer id);

}
