import { Specialist } from '../models/specialist';

export const SPECIALISTS: Specialist[] = [
  {
    id: 1,
    name: 'Dr. Marco Rossi',
    role: 'Fisioterapista',
    specialty: 'Fisioterapia',
    image: 'assets/images/specialists/marco-rossi.jpg',
    bio: 'Specializzato nel recupero funzionale post-trauma e nella riabilitazione sportiva.'
  },
  {
    id: 2,
    name: 'Dr.ssa Laura Bianchi',
    role: 'Osteopata',
    specialty: 'Osteopatia',
    image: 'assets/images/specialists/laura-bianchi.jpg',
    bio: 'Esperta in trattamenti manuali per la gestione del dolore e il miglioramento della mobilità.'
  },
  {
    id: 3,
    name: 'Dr. Luca Verdi',
    role: 'Medico Ortopedico',
    specialty: 'Ortopedia',
    image: 'assets/images/specialists/luca-verdi.jpg',
    bio: 'Si occupa di diagnosi e trattamento delle patologie articolari e muscolo-scheletriche.'
  },
  {
    id: 4,
    name: 'Dr.ssa Sara Neri',
    role: 'Dietista',
    specialty: 'Dietistica',
    image: 'assets/images/specialists/sara-neri.jpg',
    bio: 'Aiuta i pazienti a costruire un rapporto sano con l’alimentazione attraverso percorsi nutrizionali personalizzati.'
  }
];