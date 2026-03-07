import { Service } from '../models/service';

export const SERVICES: Service[] = [
  {
    id: 1,
    name: 'Fisioterapia',
    description:
      'Percorsi riabilitativi personalizzati per il recupero funzionale dopo traumi, interventi o problematiche muscolari e articolari.',
    icon: 'assets/images/services/fisioterapia.svg'
  },
  {
    id: 2,
    name: 'Osteopatia',
    description:
      'Trattamenti manuali mirati a migliorare l’equilibrio del corpo, ridurre il dolore e favorire la mobilità.',
    icon: 'assets/images/services/osteopatia.svg'
  },
  {
    id: 3,
    name: 'Ortopedia',
    description:
      'Valutazione e trattamento delle patologie dell’apparato muscolo-scheletrico con un approccio integrato.',
    icon: 'assets/images/services/ortopedia.svg'
  },
  {
    id: 4,
    name: 'Dietistica',
    description:
      'Consulenze nutrizionali e piani alimentari personalizzati per migliorare salute, energia e benessere.',
    icon: 'assets/images/services/dietistica.svg'
  }
];