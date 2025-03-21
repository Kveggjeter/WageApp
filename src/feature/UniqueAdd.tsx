export function UniqueAdd(combined) {
    const produkt: Map<string, number> = new Map();
    const mersalg: Map<string, number> = new Map();
    let ekstra: number = 0;
    let merekstra: number = 0;

    combined.forEach((item) => {
        const id: string = item.product;
        const eks: boolean = item.ekstra;
        const maskin: boolean = item.maskinskade;
        const mer: boolean = item.mersalg;

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
    return {
        produkt: produkt,
        mersalg: mersalg,
    };
}