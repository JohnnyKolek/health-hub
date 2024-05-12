package kolek.jan.healthhub.controller;

import kolek.jan.healthhub.dto.UserDto;
import kolek.jan.healthhub.mapper.UserMapper;
import kolek.jan.healthhub.model.User;
import kolek.jan.healthhub.repository.UserRepository;
import kolek.jan.healthhub.security.service.RoleEnum;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/doctors")
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    @GetMapping
    public List<UserDto> getDoctors(){
//        return List.of(
//                new UserDto(
//                        3L,
//                        "doctor1@gmail.com",
//                        "Doctor",
//                        "Oetker",
//                        "",
//                        "/assets/img/doctor1.jpg"
//                ),
//                new UserDto(
//                        4L,
//                        "doctor4@gmail.com",
//                        "Doctor",
//                        "Dolittle",
//                        "",
//                        "/assets/img/doctor1.jpg"
//                )
//        );
//
        System.out.println(RoleEnum.ROLE_DOCTOR.name());
        return userRepository.findByRoleName(RoleEnum.ROLE_DOCTOR.name())
                .stream()
                .map(userMapper::toDto)
                .toList();

    }
}
