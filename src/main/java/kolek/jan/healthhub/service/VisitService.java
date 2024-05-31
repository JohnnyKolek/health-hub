package kolek.jan.healthhub.service;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import kolek.jan.healthhub.model.User;
import kolek.jan.healthhub.model.Visit;
import kolek.jan.healthhub.repository.UserRepository;
import kolek.jan.healthhub.repository.VisitRepository;
import kolek.jan.healthhub.security.service.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class VisitService {

    private final JwtService jwtService;
    private final UserRepository userRepository;
    private final VisitRepository visitRepository;


    public List<Visit> getPatientVisits(String token) {

        String jwt = token.substring(7);
        String email = jwtService.extractUsername(jwt);
        return visitRepository.findPatientVisits(email);
    }


    public List<Visit> getDoctorVisits(String token) {

        String jwt = token.substring(7);
        String email = jwtService.extractUsername(jwt);
        User doctor = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("USer not found"));
        return visitRepository.findDoctorVisits(doctor.getId());
    }

    @Transactional
    public void addNewVisit(Visit visit, String token) {

        String jwt = token.substring(7);
        String email = jwtService.extractUsername(jwt);
        User doctor = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("USer not found"));
        visit.setDoctor(doctor);
        visitRepository.save(visit);
    }

    public void reserveVisit(String token, Long visitId) {
        String jwt = token.substring(7);
        String email = jwtService.extractUsername(jwt);
        Visit visit = visitRepository.findById(visitId)
                .orElseThrow(
                        () -> new EntityNotFoundException(String.format("Visit with id: %d not found", visitId)
                        )
                );
        User user = userRepository.findByEmail(email).orElseThrow(() -> new EntityNotFoundException(String.format("User with email: %s not found", email)));
        visit.setPatient(user);
        visitRepository.save(visit);
    }



}
