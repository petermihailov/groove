import { instruments } from '../../constants';
import { Measure } from '../../lib/Measure';

export const defaultMeasure = new Measure(instruments);
// hi-hat
defaultMeasure.notes.hhCloseRegular[0] = true;
defaultMeasure.notes.hhCloseRegular[2] = true;
defaultMeasure.notes.hhCloseRegular[4] = true;
defaultMeasure.notes.hhCloseRegular[6] = true;
defaultMeasure.notes.hhCloseRegular[8] = true;
defaultMeasure.notes.hhCloseRegular[10] = true;
defaultMeasure.notes.hhCloseRegular[12] = true;
defaultMeasure.notes.hhCloseRegular[14] = true;
// kick
defaultMeasure.notes.kiKickRegular[0] = true;
defaultMeasure.notes.kiKickRegular[7] = true;
defaultMeasure.notes.kiKickRegular[8] = true;
defaultMeasure.notes.kiKickRegular[10] = true;
// snare
defaultMeasure.notes.snSnareRegular[4] = true;
defaultMeasure.notes.snSnareRegular[12] = true;
