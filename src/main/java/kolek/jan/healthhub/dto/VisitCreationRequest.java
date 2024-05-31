package kolek.jan.healthhub.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class VisitCreationRequest {
    private LocalDate date;
    @JsonFormat(pattern = "HH:mm")
    private LocalTime hour;
}
