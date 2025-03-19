const h: string[] = [ "Hus", "UDF Hus", "Hytte", "Råte og skadedyr", "Innbo", "Innbo Gruppe", "Tillegg til innbo", "Verdigjenstand" ];
const b: string[] = [ "Bil", "UDF Bil", "Bobil", "MC", "Moped", "Campingvogn/tilhenger", "Snøscooter", "Veteran", "Gårdsbil", "Lastebil", "Traktor/arbeidsmaskin", "Traktor og andre", "Elsparkesykkel" ];
const p: string[] = [ "Barn", "Ulykke", "Behandling", "Kritisk sykdom", "OBOS person", "NITO person" ];
const n: string[] = [ "Liv" ]
const r: string[] = [ "Reise", "Reise kollektiv", "Utvidet reise" ];
const d: string[] = [ "Dyr" ];
const a: string[] = [ "Huseier bolig", "Engangstransport" ];

export function sak(s: string) {
    switch (s) {
        case "hus":
                return h;
                case "bil":
                return b;
        case "person":
                    return p;
        case "nordea":
                return n;
        case "baat":
            return b;
        case "reise":
            return r;
        case "dyr":
            return d;
        case "annet":
            return a
        default:
            return null;
    }
}