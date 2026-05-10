package kartikeykeepnotes.backend.Repositories;
import org.springframework.stereotype.Repository;
import kartikeykeepnotes.backend.Entities.*;
import org.springframework.data.mongodb.repository.MongoRepository;


@Repository
public interface RoadmapRepository extends MongoRepository<RoadmapEntity, String>{
    
}
