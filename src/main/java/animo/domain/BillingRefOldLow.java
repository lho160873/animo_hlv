package animo.domain;
import javax.persistence.*;
import java.io.Serializable;

/**
 * Created by Lida on 28.03.2019.
 */
@Embeddable
public class BillingRefOldLow implements Serializable {

    private Integer idnOld;
    private Integer idnLow;

    BillingRefOldLow() {}

    public BillingRefOldLow(Integer idnOld, Integer idnLow) {
        this.idnOld = idnOld;
        this.idnLow = idnLow;
    }

    public Integer getIdnOld() {
        return idnOld;
    }

    public void setIdnOld(Integer idnOld) {
        this.idnOld = idnOld;
    }

    public Integer getIdnLow() {
        return idnLow;
    }

    public void setIdnLow(Integer idnLow) {
        this.idnLow = idnLow;
    }
}
