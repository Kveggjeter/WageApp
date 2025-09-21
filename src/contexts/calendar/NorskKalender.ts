export function NorskKalender(n: number | undefined): string {
    switch (n) {
        case 0:
            return "Januar";
            case 1:
                return "Februar";
                case 2:
                    return "Mars";
                    case 3:
                        return "April";
                        case 4:
                            return "Mai";
                            case 5:
                                return "Juni";
                                case 6:
                                    return "Juli";
                                    case 7:
                                        return "August";
                                        case 8:
                                            return "September";
                                            case 9:
                                                return "Oktober";
                                                case 10:
                                                    return "November";
                                                    case 11:
                                                        return "Desember";
                                                        default:
                                                            return "";
    }
}

export function KalenderNorsk(s: string | undefined): number {
    switch (s) {
        case "Januar":
            return 1;
        case "Februar":
            return 2;
        case "Mars":
            return 3;
        case "April":
            return 4;
        case "Mai":
            return 5;
        case "Juni":
            return 6;
        case "Juli":
            return 7;
        case "August":
            return 8;
        case "September":
            return 9;
        case "Oktober":
            return 10;
        case "November":
            return 11;
        case "Desember":
            return 12;
        default:
            return 0;
    }
}