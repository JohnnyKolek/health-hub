package kolek.jan.healthhub.controller;

import kolek.jan.healthhub.model.Visit;
import kolek.jan.healthhub.repository.VisitRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/visits")
@RequiredArgsConstructor
public class VisitController {

    private final VisitRepository visitRepository;

    @GetMapping
    public List<Visit> getVisits() {
        return visitRepository.findAll();
    }

    @GetMapping("/{visitId}")
    public Visit getVisitById(@PathVariable Long visitId){
        return visitRepository.findById(visitId).orElse(null);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void addVisit(@RequestBody Visit visit){
        visitRepository.save(visit);
    }

}
