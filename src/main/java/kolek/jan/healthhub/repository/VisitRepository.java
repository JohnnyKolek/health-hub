package kolek.jan.healthhub.repository;

import kolek.jan.healthhub.model.Visit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface VisitRepository extends JpaRepository<Visit, Long> {

    @Query("select v from Visit v where v.doctor.id = ?1")
    List<Visit> findDoctorVisits(Long id);

    @Query("select v from Visit v where v.patient.email = ?1")
    List<Visit> findPatientVisits(String email);

}
