package kartikeykeepnotes.backend.Controllers;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
@RequestMapping("/api/util")
public class UtilityController {
    
    @GetMapping("/")
    public String app(){
       return "Util Service reachable";
    }

    
}
