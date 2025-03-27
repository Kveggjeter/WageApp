export function UniqueAdd(combined) {
    const produkt: Map<string, number> = new Map();
    const mersalg: Map<string, number> = new Map();
    let ekstra: number = 0;
    let merekstra: number = 0;
    let livSumProdukt: number = 0;
    let livSumMersalg: number = 0;

    combined.forEach((item) => {
        const isLiv = item.product.includes("Liv");
        const id: string = isLiv ? "Liv" : item.product;
        const eks: boolean = item.ekstra;
        const maskin: boolean = item.maskinskade;
        const mer: boolean = item.mersalg;

        if (isLiv && item.amount) {
            if (mer) {
                livSumMersalg += item.amount;
            } else {
                livSumProdukt += item.amount;
            }
        }

        if(mer) {
            if (mersalg.has(id)) {
                const value = mersalg.get(id);
                mersalg.set(id, value! + 1);
            } else mersalg.set(id, 1);

            if (eks) merekstra++;
            if (maskin) merekstra++;
        } else {

            if (produkt.has(id)) {
                const value = produkt.get(id);
                produkt.set(id, value! + 1);
            } else produkt.set(id, 1);

            if (eks) ekstra++;
            if (maskin) ekstra++;
        }
    });
    mersalg.set("ekstra", merekstra);
    produkt.set("ekstra", ekstra)

    if (livSumProdukt > 0) {
        produkt.set("livSum", livSumProdukt);
    }
    if (livSumMersalg > 0) {
        mersalg.set("livSum", livSumMersalg);
    }

    return {
        produkt: produkt,
        mersalg: mersalg,
    };
}