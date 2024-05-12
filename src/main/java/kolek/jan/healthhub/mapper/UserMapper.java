package kolek.jan.healthhub.mapper;

import kolek.jan.healthhub.dto.UserDto;
import kolek.jan.healthhub.model.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public UserDto toDto(User user) {
        return new UserDto(user.getId(),
                user.getEmail(),
                user.getName(),
                user.getSurname(),
                user.getPhone(),
                user.getPhotoUrl()
        );
    }

}
