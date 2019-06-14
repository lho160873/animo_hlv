package animo.controllers;

import animo.domain.SubjArea;
import animo.repos.SubjAreaRepo;
import animo.service.GraphService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.io.IOException;
import java.util.List;
import java.util.Map;

/**
 * Created by Lida on 20.03.2019.
 */
@Controller
public class GraphController {
    @Autowired
    private GraphService graph;
    @Autowired
    private SubjAreaRepo subjAreaRepo;



    @GetMapping("/definitionGraph")
    public String definitionGraph(@RequestParam(required = false, defaultValue = "") Integer subjAreaId, Model model )throws IOException {

        List<Map<String, Object>> connections = graph.loadConnections(subjAreaId);
        List<Map<String, Object>> definitions = graph.loadDefinitonGood(subjAreaId);
        List<Map<String, Object>> definitionsBad = graph.loadDefinitonBad(subjAreaId);


        Iterable<SubjArea> subjAreaList = subjAreaRepo.findAll();

        /*Iterable<DefinitionTbl>  definitions;
        if (subjAreaId != null) {
            definitions = definitionTblRepo.findBySubjAreaId(subjAreaId.intValue());

        } else {
            definitions = definitionTblRepo.findAll();
        }*/

        model.addAttribute("subjAreaList", subjAreaList);
        model.addAttribute("subjAreaId", subjAreaId);
        model.addAttribute("definitions", definitions);
        model.addAttribute("definitionsBad", definitionsBad);
        model.addAttribute("connections", connections);

        return "definitionGraph";
    }

    @GetMapping("/definitionCalc")
    public String definitionCalc(@RequestParam(required = false, defaultValue = "") Integer subjAreaId, Model model )throws IOException {
        String test = "OK";
        if (subjAreaId == null) {
            return "definition";
        }


        //TAnaliz tAnaliz = new TAnaliz();

        //test = tAnaliz.WordStem("рассматривают");

        Boolean res = graph.buildGraph(subjAreaId);
        if (res)
            test = "Анализ взаимосвязей выплнен УСПЕШНО!";
        else
            test = "Произошла ОШИБКА при выполнении анализа взаимосвязей!";
        model.addAttribute("test", test);
        //model.addAttribute("lGraphIdea", lGraphIdea);

        return "definition";
}
}

