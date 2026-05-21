package kartikeykeepnotes.backend.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import kartikeykeepnotes.backend.Entities.UserEntity;
import kartikeykeepnotes.backend.Repositories.UserRepository;


@Service
public class AuthServices {

    @Autowired
    private UserRepository userRepository;

    public UserEntity signUp(UserEntity userEntity){
        UserEntity newUser = new UserEntity();
        newUser.setEmail(userEntity.getEmail());
        newUser.setName(userEntity.getName());
        newUser.setPassword(userEntity.getPassword());
        return userRepository.save(newUser);
    }
    
}
