package kolek.jan.healthhub.mapper;

import kolek.jan.healthhub.dto.VisitCreationRequest;
import kolek.jan.healthhub.dto.VisitDto;
import kolek.jan.healthhub.model.User;
import kolek.jan.healthhub.model.Visit;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class VisitMapper {

    public VisitDto toDto(Visit visit) {
        VisitDto visitDto = new VisitDto();
        visitDto.setId(visit.getId());
        visitDto.setCompleted(visit.getCompleted());
        visitDto.setDoctor(visit.getDoctor().getName() + " " + visit.getDoctor().getSurname());
        if (visit.getPatient() != null) {
            visitDto.setPatient(visit.getPatient().getName() + " " + visit.getPatient().getSurname());
        }
        visitDto.setDateTime(visit.getDateTime());
        return visitDto;
    }

    public Visit toEntity(VisitCreationRequest visitCreationRequest, User doctor) {
        Visit visit = new Visit();
        visit.setDoctor(doctor);
        LocalDateTime dateTime = LocalDateTime.of(visitCreationRequest.getDate(), visitCreationRequest.getHour());
        visit.setDateTime(dateTime);
        return visit;
    }

}
