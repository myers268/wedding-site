import type { Database } from ".";
import * as schema from "./schema";

interface CsvRow {
  partyName: string;
  guestName: string;
  isKid: boolean;
  isPrimary: boolean;
}

export async function importGuestsFromCsv(db: Database, csvContent: string) {
  // Split all values by comma and process in groups of 4
  const allValues = csvContent.trim().split(',').map(v => v.trim());
  const rows: CsvRow[] = [];
  
  // Parse CSV content in groups of 4 values
  for (let i = 0; i < allValues.length; i += 4) {
    const [partyName, guestName, isKidStr, isPrimaryStr] = allValues.slice(i, i + 4);
    
    // Skip if we don't have all 4 values or guestName is empty
    if (!partyName || !guestName || !isKidStr || !isPrimaryStr) continue;
    if (guestName.trim() === '') continue;
    
    rows.push({
      partyName: partyName.trim(),
      guestName: guestName.trim() === 'GUEST' ? '' : guestName.trim(),
      isKid: isKidStr.trim() === '1',
      isPrimary: isPrimaryStr.trim() === '1',
    });
  }
  
  // Group guests by party, handling the "-" rule
  const parties = new Map<string, CsvRow[]>();
  let currentPartyKey = '';
  let currentPartyName = '';
  let partyCounter = 0;
  
  for (const row of rows) {
    if (row.partyName === '-') {
      // Use the previous party name and key
      if (!currentPartyName) {
        throw new Error('Found "-" party name without a previous party');
      }
      row.partyName = currentPartyName;
    } else {
      // New party name - create a unique key
      currentPartyName = row.partyName;
      currentPartyKey = `${row.partyName}_${partyCounter}`;
      partyCounter++;
    }
    
    if (!parties.has(currentPartyKey)) {
      parties.set(currentPartyKey, []);
    }
    parties.get(currentPartyKey)!.push(row);
  }
  
  // Insert parties and guests into database
  for (const [, guests] of parties) {
    // Use the original party name (remove the unique suffix)
    const partyName = guests[0].partyName;
    
    // Create party
    const [party] = await db
      .insert(schema.party)
      .values({ name: partyName })
      .returning();
    
    // Create guests for this party
    const guestInserts = guests.map(guest => ({
      fullName: guest.guestName === '' ? null : guest.guestName,
      isPrimary: guest.isPrimary,
      isKid: guest.isKid,
      partyId: party.id,
    }));
    
    await db.insert(schema.guest).values(guestInserts);
  }
  
  console.log(`Imported ${parties.size} parties with ${rows.length} guests total`);
}