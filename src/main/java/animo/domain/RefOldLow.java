package animo.domain;

import javax.persistence.*;

/**
 * Created by Lida on 28.03.2019.
 */
@Entity
@Table(name = "ref_old_low")
@IdClass(BillingRefOldLow.class)
public class RefOldLow {

    public RefOldLow()
    {

    }

    public RefOldLow(BillingRefOldLow billingRefOldLow)
    {
        idnOld = billingRefOldLow.getIdnOld();
        idnLow = billingRefOldLow.getIdnLow();
    }

    @Id
    @AttributeOverrides(
            {@AttributeOverride(name = "idnOld",
            column = @Column(name="idnOld")),
            @AttributeOverride(name = "idnLow",
            column = @Column(name="idnLow"))
            })

    private Integer idnOld;
    private Integer idnLow;



    @Column(name = "subj_area_id")
    private Integer subjAreaId;




    public Integer getSubjAreaId() {
        return subjAreaId;
    }

    public void setSubjAreaId(Integer subjAreaId) {
        this.subjAreaId = subjAreaId;
    }




}
