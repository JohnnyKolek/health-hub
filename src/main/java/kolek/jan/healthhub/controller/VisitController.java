package kolek.jan.healthhub.controller;

import jakarta.persistence.EntityNotFoundException;
import kolek.jan.healthhub.dto.VisitDto;
import kolek.jan.healthhub.mapper.VisitMapper;
import kolek.jan.healthhub.model.Visit;
import kolek.jan.healthhub.repository.UserRepository;
import kolek.jan.healthhub.repository.VisitRepository;
import kolek.jan.healthhub.service.VisitService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/visits")
@RequiredArgsConstructor
public class VisitController {

    private final VisitRepository visitRepository;
    private final UserRepository userRepository;
    private final VisitMapper visitMapper;
    private final VisitService visitService;

    @GetMapping
    public List<VisitDto> getVisits() {
        return visitRepository.findAll()
                .stream()
                .map(visitMapper::toDto)
                .toList();
    }

    @GetMapping("/doctor/{doctorId}")
    public List<VisitDto> getDoctorVisits(@PathVariable Long doctorId) {
        return visitRepository.findDoctorVisits(doctorId)
                .stream()
                .map(visitMapper::toDto)
                .toList();
    }

    @GetMapping("/patient")
    public List<VisitDto> getPatientVisits(@RequestHeader("Authorization") String authorizationHeader) {
        return visitService.getPatientVisits(authorizationHeader)
                .stream()
                .map(visitMapper::toDto)
                .toList();
    }

    @GetMapping("/{visitId}")
    public VisitDto getVisitById(@PathVariable Long visitId) {
        Visit visit = visitRepository.findById(visitId).orElseThrow(EntityNotFoundException::new);
        return visitMapper.toDto(visit);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void addVisit(@RequestBody Visit visit) {
        visitRepository.save(visit);
    }

    @PutMapping("/{visitId}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void reserveVisit(@PathVariable Long visitId, @RequestHeader("Authorization") String authorizationHeader) {
        visitService.reserveVisit(authorizationHeader, visitId);
    }

    @ExceptionHandler(EntityNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public String handleVisitNotFound(EntityNotFoundException exception) {
        return "Visit not Found: " + exception.getMessage();
    }

}
