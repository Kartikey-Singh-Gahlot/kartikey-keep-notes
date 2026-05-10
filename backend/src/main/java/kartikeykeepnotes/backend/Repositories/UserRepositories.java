package kartikeykeepnotes.backend.Repositories;
import kartikeykeepnotes.backend.Entities.*;
import org.springframework.stereotype.Repository;
import org.springframework.data.mongodb.repository.MongoRepository;


@Repository
public interface UserRepositories extends MongoRepository<UserEntity, String> {
    
}
