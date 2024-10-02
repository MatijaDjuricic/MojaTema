import { EnumObject } from "../types/types";
export const monthsCyrillic: string[] = ['Јануар', 'Фебруар', 'Март', 'Април', 'Мај', 'Јун', 'Јул', 'Август', 'Септембар', 'Октобар', 'Новембар', 'Децембар'];
export const daysCyrillic: string[] = ['Недеља', 'Понедељак', 'Уторак', 'Среда', 'Четвртак', 'Петак', 'Субота'];
export const roleEnum: EnumObject = Object.freeze({
    SUPER_ADMINISTRATOR: { id: 1, nameCyrillic: 'супер администратор' },
    ADMINISTRATOR: { id: 2, nameCyrillic: 'администратор' },
    DIREKTOR: { id: 3, nameCyrillic: 'директор' },
    KOORDINATOR: { id: 4, nameCyrillic: 'координатор' },
    PROFESOR: { id: 5, nameCyrillic: 'професор' },
    MENTOR: { id: 6, nameCyrillic: 'ментор' },
    ODELJENSKI_STARESINA: { id: 7, nameCyrillic: 'одењенски старешина' },
    UCENIK: { id: 8, nameCyrillic: 'ученик' },
    PREDSEDNIK_KOMISIJE: { id: 9, nameCyrillic: 'председник комисије' },
    RUKOVODILAC_AKTIVA: { id: 10, nameCyrillic: 'руководилац актива' },
});
export const topicStatusEnum: EnumObject = Object.freeze({
    SLOBODNA: { id: 1, nameCyrillic: 'слободна' },
    NA_CEKANJU: { id: 2, nameCyrillic: 'на чекању' },
    REZERVISANA: { id: 3, nameCyrillic: 'резервисана' },
});
export const classEnum: EnumObject = Object.freeze({
    DRUSTVENO_JEZICKI: { id: 1, nameCyrillic: 'друштвено-језички' },
    PRIRODNO_MATEMATICKI: { id: 2, nameCyrillic: 'природно-математички' },
    UCENICI_SA_POSEBNIM_SPOSOBNOSTIMA_ZA_INFORMATIKU: { id: 3, nameCyrillic: 'ученици са посебним способностима за информатику' },
    UCENICI_SA_POSEBNIM_SPOSOBNOSTIMA_ZA_FIZIKU: { id: 4, nameCyrillic: 'ученици са посебним способностима за физику' },
});
export const studentEnum: EnumObject = Object.freeze({
    AKTIVAN: { id: 1, nameCyrillic: 'активан' },
    ARHIVIRAN: { id: 2, nameCyrillic: 'архивиран' },
});
export const graduationPaperEnum: EnumObject = Object.freeze({
    POSLAT: { id: 1, nameCyrillic: 'послат' },
    NA_PREGLEDANJU: { id: 2, nameCyrillic: 'на прегледању' },
    POTREBNO_KORIGOVANJE: { id: 3, nameCyrillic: 'потребно кориговање' },
    ODOBREN_ZA_STAMPU: { id: 4, nameCyrillic: 'одобрено за штампу' },
});