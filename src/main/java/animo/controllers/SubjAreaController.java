package animo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import animo.domain.Developer;
import animo.domain.SubjArea;
import animo.repos.SubjAreaRepo;

import animo.domain.Developer;
import animo.repos.DeveloperRepo;

import java.io.IOException;
import java.util.List;
import java.util.Map;


@Controller
public class SubjAreaController {
    @Autowired
    private SubjAreaRepo subjAreaRepo;

    @Autowired
    private DeveloperRepo developerRepo;




    @GetMapping("/subjarea")
    public String subjAreaList(@RequestParam(required = false, defaultValue = "") String filter, Model model)
    {
        Iterable<SubjArea> subjAreas = subjAreaRepo.findAll();
        Iterable<Developer> developers = developerRepo.findAll();

        model.addAttribute("subjAreas", subjAreas);
        model.addAttribute("developers", developers);

        return "subjAreaList";
    }

    @PostMapping("/subjarea")
    public String addSubjArea(
            @RequestParam String name,
            @RequestParam String fio,
            Map<String, Object> model) throws IOException {
        SubjArea subjArea;


        List<Developer> developer = developerRepo.findByFio(fio);

        if (!developer.isEmpty()) {
            Integer DeveloperId = developer.get(0).getDeveloperId(); //берем первого
            subjArea = new SubjArea(name, DeveloperId, fio);
        } else {
            subjArea = new SubjArea(name, fio);
        }

        subjAreaRepo.save(subjArea);

        /*Iterable<SubjArea> subjAreas = subjAreaRepo.findAll();
        model.put("subjAreas", subjAreas);
        Iterable<Developer> developers = developerRepo.findAll();
        model.put("developers", developers);*/


        //return "subjAreaList";
        return "redirect:/subjarea";
    }

    @GetMapping("/subjareaDel/{subjArea}")
    public String subjareaDel(@PathVariable SubjArea subjArea,
                               Map<String, Object> model )throws IOException {
        subjAreaRepo.delete(subjArea);

        return "redirect:/subjarea";

    }


}