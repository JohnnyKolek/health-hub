package kolek.jan.healthhub.controller;

import kolek.jan.healthhub.dto.UserDto;
import kolek.jan.healthhub.mapper.UserMapper;
import kolek.jan.healthhub.model.User;
import kolek.jan.healthhub.repository.UserRepository;
import kolek.jan.healthhub.security.service.RoleEnum;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    @GetMapping("/doctors")
    public List<UserDto> getDoctors() {
        return userRepository.findByRoleName(RoleEnum.ROLE_DOCTOR.name())
                .stream()
                .map(userMapper::toDto)
                .toList();

    }

    @GetMapping
    public UserDto getUserData(@RequestParam Long id) {
        return userMapper.toDto(userRepository.findById(id)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"))
        );
    }
}
