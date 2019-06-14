package animo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import animo.domain.Developer;
import animo.repos.DeveloperRepo;

import java.util.List;
import java.util.Map;
import java.io.IOException;


@Controller
public class DeveloperController {
    @Autowired
    private DeveloperRepo developerRepo;

   /* @GetMapping
    public String userList(Model model) {
        model.addAttribute("definitions", definitionRepo.findAll());

        return "definitionList";
    }*/


    @GetMapping("/developer")
    public String developerList(@RequestParam(required = false, defaultValue = "") String filter, Model model)
    {
        Iterable<Developer> developers = developerRepo.findAll();
        model.addAttribute("developers", developers);
        return "developerList";
    }

    @PostMapping("/developer")
    public String developerAdd(
            @RequestParam String fio,
            @RequestParam String comment,
            Map<String, Object> model) throws IOException {

        Developer developer = new Developer(fio, comment);


        developerRepo.save(developer);
        Iterable<Developer> developers = developerRepo.findAll();
        model.put("developers", developers);
        return "developerList";
    }


    @PostMapping("/developerDel")
    public String developerDel(@RequestParam Integer developerId,
                               Map<String, Object> model )throws IOException {

        List<Developer> developerForDel = developerRepo.findByDeveloperId(developerId);
        developerRepo.deleteAll(developerForDel);

        return "redirect:/developer";

    }

    @PostMapping("/developerEdit")
    public String developerEdit(@RequestParam Integer developerId, @RequestParam String fio, @RequestParam String comment,
                               Map<String, Object> model )throws IOException {

        List<Developer> developerForEditLst = developerRepo.findByDeveloperId(developerId);

        developerForEditLst.get(0).setFio(fio);
        developerForEditLst.get(0).setComment(comment);

        developerRepo.save(developerForEditLst.get(0));

        return "redirect:/developer";


    }

}