import { ClassEnum, GraduationPaperEnum, RoleEnum, StudentEnum, TopicStatusEnum } from "./enums";
export const queryStaleTime = {
    users: 1000 * 60 * 5,
    topics: 1000 * 60 * 5,
    subjects: 1000 * 60 * 5,
    professorSubjects: 1000 * 60 * 5
}
export const themes = {
    light: 'light',
    dark: 'dark'
}
export const monthsCyrillic: string[] = ['Јануар', 'Фебруар', 'Март', 'Април', 'Мај', 'Јун', 'Јул', 'Август', 'Септембар', 'Октобар', 'Новембар', 'Децембар'];
export const daysCyrillic: string[] = ['Недеља', 'Понедељак', 'Уторак', 'Среда', 'Четвртак', 'Петак', 'Субота'];
export const RoleNamesCyrillic: Record<RoleEnum, string> = {
    [RoleEnum.SUPER_ADMINISTRATOR]: 'супер администратор',
    [RoleEnum.ADMINISTRATOR]: 'администратор',
    [RoleEnum.DIREKTOR]: 'директор',
    [RoleEnum.KOORDINATOR]: 'координатор',
    [RoleEnum.PROFESOR]: 'професор',
    [RoleEnum.MENTOR]: 'ментор',
    [RoleEnum.ODELJENSKI_STARESINA]: 'одењенски старешина',
    [RoleEnum.UCENIK]: 'ученик',
    [RoleEnum.PREDSEDNIK_KOMISIJE]: 'председник комисије',
    [RoleEnum.RUKOVODILAC_AKTIVA]: 'руководилац актива',
};
export const TopicStatusNamesCyrillic: Record<TopicStatusEnum, string> = {
    [TopicStatusEnum.SLOBODNA]: 'слободна',
    [TopicStatusEnum.NA_CEKANJU]: 'на чекању',
    [TopicStatusEnum.REZERVISANA]: 'резервисана',
};
export const ClassNamesCyrillic: Record<ClassEnum, string> = {
    [ClassEnum.DRUSTVENO_JEZICKI]: 'друштвено-језички',
    [ClassEnum.PRIRODNO_MATEMATICKI]: 'природно-математички',
    [ClassEnum.UCENICI_SA_POSEBNIM_SPOSOBNOSTIMA_ZA_INFORMATIKU]: 'ученици са посебним способностима за информатику',
    [ClassEnum.UCENICI_SA_POSEBNIM_SPOSOBNOSTIMA_ZA_FIZIKU]: 'ученици са посебним способностима за физику',
};
export const StudentStatusNamesCyrillic: Record<StudentEnum, string> = {
    [StudentEnum.AKTIVAN]: 'активан',
    [StudentEnum.ARHIVIRAN]: 'архивиран',
};
export const GraduationPaperStatusNamesCyrillic: Record<GraduationPaperEnum, string> = {
    [GraduationPaperEnum.POSLAT]: 'послат',
    [GraduationPaperEnum.NA_PREGLEDANJU]: 'на прегледању',
    [GraduationPaperEnum.POTREBNO_KORIGOVANJE]: 'потребно кориговање',
    [GraduationPaperEnum.ODOBREN_ZA_STAMPU]: 'одобрено за штампу',
};