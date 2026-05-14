package kartikeykeepnotes.backend.Controllers;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@CrossOrigin(origins = "${FRONTEND_URL}")
@RequestMapping("/api/util")
public class UtilityController {
    
    @GetMapping("")
    public String app(){
       return "Util Service reachable";
    }

}
