package kolek.jan.healthhub.dto;

import lombok.Data;

import java.time.LocalDateTime;
@Data
public class VisitDto {

    private Long id;

    private String doctor;

    private String patient;

    private LocalDateTime dateTime;

    private Boolean completed;

}
