package animo.common;


import java.util.regex.Matcher;
import java.util.regex.Pattern;


/**
 * Created by Lida on 20.03.2019.
 */
public class TAnaliz {

    public String WordStem( String invWord )
    {
        String rvre =         "^([^аеиоуыэюя]*[аеиоуыэюя])(.*)$";
        String perfectiveground = "((ив|ивши|ившись|ыв|ывши|ывшись)|((?:[ая])(в|вши|вшись)))$";
        String adjective =    "(ее|ие|ые|ое|ими|ыми|ей|ий|ый|ой|ем|им|ым|ом|его|ого|ему|ому|их|ых|ую|юю|ая|яя|ою|ею)$";
        String participle =   "((ивш|ывш|ующ)|((?:[ая])(ем|нн|вш|ющ|щ)))$";
        String verb =         "((ила|ыла|ена|ейте|уйте|ите|или|ыли|ей|уй|ил|ыл|им|ым|ен|ило|ыло|ено|ят|ует|уют|ит|ыт|ены|ить|ыть|ишь|ую|ю)|((?:[ая])(ла|на|ете|йте|ли|й|л|ем|н|ло|но|ет|ют|ны|ть|ешь|нно)))$";
        String noun =         "(а|ев|ов|ие|ье|е|иями|ями|ами|еи|ии|и|ией|ей|ой|ий|й|иям|ям|ием|ем|ам|ом|о|у|ах|иях|ях|ы|ь|ию|ью|ю|ия|ья|я)$";
        String reflexive =    "(с[яь])$";
        String derivational = "[^аеиоуыэюя][аеиоуыэюя]+[^аеиоуыэюя]+[аеиоуыэюя].*(?:о)сть?$";

        String inWord = invWord.toLowerCase();

        String stem = inWord;
        String start = "";
        String rv = "";
        Pattern p;
        Boolean rc;

        do
        {
            p = Pattern.compile(rvre);
            Matcher matcher = p.matcher(stem);

            if (!matcher.find()) break;

            start = stem.substring(matcher.start(1),matcher.end(1));
            rv = stem.substring(matcher.start(2),matcher.end(2));

            if (rv.isEmpty()) break;

            rc = ExistReg(rv, perfectiveground, "");
            rv = sExistReg(rv, perfectiveground, "");
            if (!rc)
            {
                rv = sExistReg(rv, reflexive, "");
                if (ExistReg(rv, adjective, "")) {
                    rv = sExistReg(rv, adjective, "");
                    //rv = sExistReg(rv, participle, "");
                }
                else {
                    rc = ExistReg(rv, verb, "");
                    rv = sExistReg(rv, verb, "");
                    if (!rc) {
                        rv = sExistReg(rv, noun, "");
                    }
                }
            }
            rv = sExistReg(rv, "и$", "");
            rc = ExistReg(rv, "ь$", "");
            rv = sExistReg(rv, "ь$", "");
            if (!rc)
            {
                rv = sExistReg(rv, "ейше?$", "");
                rv = sExistReg(rv, "нн$", "н");
            }

            stem = start+rv;
        }
        while (false);

        return stem;
    }

    //---------------------------------------------------------------------------------------------------------
    public Boolean ExistReg(String inStr, String rgExp, String rpStr)
    {
        String tempStr = inStr.replaceAll(rgExp,rpStr);
        return (!tempStr.equals(inStr) );
    }

    //---------------------------------------------------------------------------------------------------------
    public String sExistReg(String inStr, String rgExp, String rpStr)
    {
        return inStr.replaceAll(rgExp,rpStr);
    }

    //---------------------------------------------------------------------------------------------------------
    public  String textAnalize(String txt)
    {
        txt = txt.replace('\r', ' ');
        txt = txt.replace('\n', ' ');
        txt = txt.replace('\t', ' ');
        txt = txt.replace(",", " , ");
        txt = txt.replace(".", " ; ");
        txt = txt.replace(":", " ; ");
        txt = txt.replace(";", " ; ");
        txt = txt.replace("!", " ; ");
        txt = txt.replace("?", " ; ");
        txt = txt.replace("(", " ");
        txt = txt.replace(")", " ");

        String[] parts   =  txt.split(" ");
        String s = "";
        for(int i=0; i < parts.length; i++)
        {
            if (parts[i].isEmpty())
                continue;
            s += (s.isEmpty() ? "" : " ") + WordStem(parts[i]);
        }
        return s;
    }

}
