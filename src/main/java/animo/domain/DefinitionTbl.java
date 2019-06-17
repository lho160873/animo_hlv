package animo.domain;

import javax.persistence.*;

@Entity
@Table(name = "definition")
public class DefinitionTbl {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "id_key_gen"  )
    @SequenceGenerator(name = "id_key_gen", sequenceName = "definition_idn_seq", allocationSize=1)
    @Column(name = "idn")
    private Integer idn;

    @Column(name = "name")
    private String name;

    @Column(name = "descript")
    private String description;

    @Column(name = "descript_n")
    private String descriptionN;

    @Column(name = "num_urov")
    private java.lang.Short numUrov;

    public String getDescriptionN() {
        return descriptionN;
    }

    public void setDescriptionN(String descriptionN) {
        this.descriptionN = descriptionN;
    }


    public java.lang.Short getNumUrov() {
         return numUrov != null ? numUrov   : -1;
    }

    public void setNumUrov(java.lang.Short numUrov) {
        this.numUrov = numUrov;
    }

    @Column(name = "subj_area_id")
    private Integer subjAreaId;

    public Integer getSubjAreaId() {
        return subjAreaId;
    }

    public void setSubjAreaId(Integer subj_area_id) {
        this.subjAreaId = subj_area_id;
    }


    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "subj_area_id", insertable = false, updatable = false)
    private SubjArea subjArea;


    public DefinitionTbl() {
    }


    public DefinitionTbl(String name, String description, String descriptionN, Integer subjAreaId) {
        this.name = name;
        this.description = description;
        this.descriptionN = descriptionN;
        if (subjAreaId != -1)
            this.subjAreaId = subjAreaId;
        //this.developerId = developerId;
    }

    public SubjArea getSubjArea() {
        return subjArea;
    }

    public void setSubjArea(SubjArea subjArea) {
        this.subjArea = subjArea;
    }

    public DefinitionTbl(String name, String description) {
        this.name = name;
        this.description = description;
    }


    public void setName(String name) {
        this.name = name;
    }

    public void setDescription(String description) {
            this.description = description;
    }

    public Integer getIdn() {

        return idn;
    }

    public void setIdn(Integer idn) {
        this.idn = idn;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description != null ? description   : "<none>";
    }

}
