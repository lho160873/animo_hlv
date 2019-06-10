package animo.domain;

import javax.persistence.*;

@Entity
@Table(name = "subj_area")
public class SubjArea {
    public Integer getSubjAreaId() {
        return subjAreaId;
    }

    public void setSubjAreaId(Integer subjAreaId) {
        this.subjAreaId = subjAreaId;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "id_key_gen"  )
    @SequenceGenerator(name = "id_key_gen", sequenceName = "subj_area_subj_area_id_seq", allocationSize=1)

    @Column(name = "subj_area_id", unique = true, nullable = false)
    private Integer subjAreaId;

    @Column(name = "name")
    private String name;

    @Column(name = "fio")
    private String fio;

    @Column(name = "developer_id")
    private Integer developer_id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "developer_id", insertable = false, updatable = false)
    private Developer developer;

    public Developer getDeveloper() {
        return developer;
    }

    public void setDeveloper(Developer developer) {
        this.developer = developer;
    }

    public Integer getDeveloper_id() {
        return developer_id;
    }

    public void setDeveloper_id(Integer developer_id) {
        this.developer_id = developer_id;
    }

    public SubjArea() {
    }

    public SubjArea(String name) {
        this.name = name;
    }

    public SubjArea(String name, Integer developer_id , String fio) {
        this.name = name;
        this.developer_id = developer_id;
        this.fio = fio;
    }

    public SubjArea(String name, String fio) {
        this.name = name;
        this.fio = fio;
    }


    public void setFio(String fio) {
        this.fio = fio;
    }

    public void setName(String name) {
            this.name = name;
    }


    public String getFio() {
        return fio != null ? fio   : "<none>";
    }

    public String getName() {
        return name != null ? name   : "<none>";
    }



}
