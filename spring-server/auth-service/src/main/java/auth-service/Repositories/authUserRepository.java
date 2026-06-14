import org.springframework.data.mongodb.repository.MongoDbRepository;

public interface authUserRepository extends MongoDbRepository<authUserEntity, String> {
    
}



