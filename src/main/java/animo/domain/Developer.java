package animo.domain;

import javax.persistence.*;

@Entity
@Table(name = "developer")
public class Developer {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "id_key_gen"  )
    @SequenceGenerator(name = "id_key_gen", sequenceName = "developer_developer_id_seq", allocationSize=1)
    @Column(name = "developer_id", unique = true, nullable = false)
    private Integer developerId;
    @Column(name = "fio")
    private String fio;
    @Column(name = "comment")
    private String comment;


    public Developer() {
    }

    public Developer(String fio, String comment) {
        this.fio = fio;
        this.comment = comment;
    }


    public void setFio(String fio) {
        this.fio = fio;
    }

    public void setComment(String comment) {
            this.comment = comment;
    }

    public Integer getDeveloperId() {
        return developerId;
    }

    public void setDeveloperId(Integer developerId) {
        this.developerId = developerId;
    }

    public String getFio() {
        return fio != null ? fio   : "<none>";
    }

    public String getComment() {
        return comment != null ? comment   : "<none>";
    }





}
