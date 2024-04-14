package kolek.jan.healthhub.repository;

import kolek.jan.healthhub.model.Visit;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VisitRepository extends JpaRepository<Visit, Long> {
}
