package animo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import animo.common.TAnaliz;
import animo.domain.*;
import animo.repos.DefinitionTblRepo;
import animo.repos.DeveloperRepo;
import animo.repos.SubjAreaRepo;
import animo.service.GraphService;

import java.io.IOException;
import java.util.Map;



@Controller
public class DefinitionTblController {
    @Autowired
    private DefinitionTblRepo definitionTblRepo;

    @Autowired
    private SubjAreaRepo subjAreaRepo;

    @Autowired
    private DeveloperRepo developerRepo;

    @Autowired
    private GraphService graph;


   /* @GetMapping
    public String userList(Model model) {
        model.addAttribute("definitions", definitionRepo.findAll());

        return "definitionList";
    }*/


    @GetMapping("/definition")
    public String definitionList(@RequestParam(required = false, defaultValue = "") Integer subjAreaId,  Model model)
    {
        Iterable<SubjArea> subjAreaList = subjAreaRepo.findAll();
        Iterable<DefinitionTbl>  definitions;
        if (subjAreaId != null) {
            definitions = definitionTblRepo.findBySubjAreaId(subjAreaId.intValue());

        } else {
            definitions = definitionTblRepo.findAll();
        }

        model.addAttribute("definitions", definitions);
        model.addAttribute("subjAreaList", subjAreaList);
        model.addAttribute("subjAreaId", subjAreaId);

        return "definitionList";
    }

    @GetMapping("/definitionFind")
    public String definitionFind(@RequestParam(required = false, defaultValue = "") String filter, Model model) {
        Iterable<DefinitionTbl> definitions = definitionTblRepo.findByName(filter);
        model.addAttribute("definitions", definitions);

        return "definitionFind";
    }

    @GetMapping("/definitionAdd")
    public String definitionAdd(
            @RequestParam String name,
            @RequestParam String description,
            @RequestParam Integer subjAreaId,
            Map<String, Object> model) throws IOException {

        DefinitionTbl definitionForAdd;

        TAnaliz tanaliz = new TAnaliz();
        String descriptionN = tanaliz.textAnalize(name +" . " + description);
        definitionForAdd = new DefinitionTbl(name, description, descriptionN, subjAreaId.intValue());


        definitionTblRepo.save(definitionForAdd);

        return "redirect:/definition?subjAreaId="+subjAreaId.toString();
    }


    @GetMapping("/definitionDel/{definition}")
    public String definitionDel(@PathVariable DefinitionTbl definition,
                              Map<String, Object> model )throws IOException {

        definitionTblRepo.delete(definition);
        return "redirect:/definitionFind";
    }




}