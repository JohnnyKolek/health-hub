package kolek.jan.healthhub.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
@Getter
@Entity
@Table(name = "visits")
@NoArgsConstructor
@AllArgsConstructor
@Setter
public class Visit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JoinColumn(name = "doctor_id")
    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private User doctor;

    @JoinColumn(name = "patient_id")
    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private User patient;

    @Column(name = "date_time")
    private LocalDateTime dateTime;

    @Column(name = "completed")
    private Boolean completed;

}
