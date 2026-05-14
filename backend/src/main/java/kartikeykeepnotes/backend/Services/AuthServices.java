package kartikeykeepnotes.backend.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import kartikeykeepnotes.backend.Entities.ResponseEntity;
import kartikeykeepnotes.backend.Entities.UserEntity;


@Service
public class AuthServices {

    @Autowired
    private ResponseEntity ResponseEntity;


    public UserEntity signUp(UserEntity userEntity){
        UserEntity user = new UserEntity();
        return user;
    }
    
}
