import { drizzle } from "drizzle-orm/d1";
import { inArray } from "drizzle-orm";
import * as schema from "./schema";
import { importGuestsFromCsv } from "./csv-importer";

export const EVENTS = {
  WEDDING: "Wedding",
  INDIANA_SHOWER: "Indiana Wedding Shower",
  WASHINGTON_SHOWER: "Washington Wedding Shower",
  REHEARSAL_DINNER: "Rehearsal Dinner",
};

export function createDb(d1Database: D1Database) {
  return drizzle(d1Database, { schema });
}

export async function createDbWithSeed(d1Database: D1Database) {
  const db = createDb(d1Database);
  await seedEvents(db);
  await seedGuests(db);
  await linkGuestsToEvents(db, [
    EVENTS.WEDDING,
    EVENTS.INDIANA_SHOWER,
    EVENTS.WASHINGTON_SHOWER,
  ]);
  return db;
}

export type Database = ReturnType<typeof createDb>;

// Utility functions for seeding data
export async function seedEvents(db: Database) {
  const existingEvents = await db.select().from(schema.event);
  const existingEventNames = new Set(existingEvents.map(event => event.name));

  const eventsToInsert = [
    {
      name: EVENTS.WEDDING,
      location: "1340 Quincy Street NE, Washington, D.C. 20017",
      timestamp: new Date(2026, 0, 2, 16, 30, 0).getTime(),
      description: "St Francis Hall",
    },
    {
      name: EVENTS.INDIANA_SHOWER,
      location: "865 E 400 S, Kokomo, IN 46902",
      timestamp: new Date(2025, 9, 4, 14, 0, 0).getTime(),
      description: "Abundant Life Church Life Center",
    },
    {
      name: EVENTS.WASHINGTON_SHOWER,
      location: "Longview, WA 98632",
      timestamp: new Date(2025, 11, 6, 14, 0, 0).getTime(),
      description: "",
    },
    // {
    //   name: "Rehearsal Dinner",
    //   location: "1225 Otis St NE, Washington, DC 20017",
    //   timestamp: new Date(2026, 0, 1, 18, 30, 0).getTime(),
    //   description: "The District Church Ministry Center",
    // }
  ].filter(event => !existingEventNames.has(event.name));

  if (eventsToInsert.length > 0) {
    await db.insert(schema.event).values(eventsToInsert);
  }
}

export async function seedGuests(db: Database) {
  const existingGuests = await db.select().from(schema.guest);
  if (existingGuests.length > 0) return;

  await importGuestsFromCsv(
    db,
    "The Wygants,Jodi Wygant,0,1, -,Jeff Wygant,0,1, -,Jase Wygant,0,1, Jaylee and Max,Jaylee Wygant,0,1, -,Max Dawkins,0,1, Gloria DePriest,Gloria DePriest,0,1, Christin and Aaron Hart,Christin Hart,0,1, -,Aaron Hart,0,1, Grandma and Poppa DePriest,Jan DePriest,0,1, -,Kurt DePriest,0,1, The Hummels,Dana Hummel,0,1, -,Richard Hummel,0,1, -,Ethan Hummel,0,1, Ragan Hummel,Ragan Hummel,0,1, -,Amber Cambell,0,1, Madison Hummel,Madison Hummel,0,1, -,GUEST,0,0, Christy and Lonnie Dawkins,Lonnie Dawkins,0,1, -,Christy Dawkins,0,1, Anna and Pheobe McGraw,Anna McGraw,0,1, -,Pheobe McGraw,0,1, The Claunches,Deanna Claunch,0,1, -,Lane Claunch,0,1, Emily and Aldo Eysaman,Emily Eysaman,0,1, -,Aldo Eysaman,0,1, The Decoys,Karen Decoy,0,1, -,Tom Decoy,0,1, -,Claire Decoy,0,1, -,Sarah Decoy,0,1, Jonah Graves,Jonah Graves,0,1, Nicole and Ben Hull,Nicole Hull,0,1, -,Ben Hull,0,1, Ethan Huynh,Ethan Huynh,0,1, Angela and James Whitfield,James Whitfield,0,1, -,Angela Whitfield,0,1, Jena Postma,Jena Postma,0,1, Carinna and Bryce,Carinna Prince,0,1, -,Bryce Mueller,0,1, The Quaifes,Leanne Quaife,0,1, -,Steve Quaife,0,1, Ashley and Jody Wiltfong,Ashley Wiltfong,0,1, -,Jody Wiltfong,0,1, Lexi Totten,Lexi Totten,0,1, Maya and Josh Wood,Maya Wood,0,1, -,Josh Wood,0,1, -,Beth Wood,1,0, Angela and Daniel Ngo,Angela Ngo,0,1, -,Daniel Ngo,0,1, Laura and Tommy Holliday,Laura Holliday,0,1, -,Tommy Holliday,0,1, Sam and Val Carlton,Sam Carlton,0,1, -,Val Carlton,0,1, Courtney Donlon,Courtney Donlon,0,1, -,Jack ,0,1, Jocelyn and Dean Esquibel,Jocelyn Esquibel,0,1, -,Dean Esquibel,0,1, Bridget and Dustin Ethridge,Bridget Ethridge,0,1, -,Dustin Ethridge,0,1, -,Finley Ethridge,1,0, The Kelly's,Christine Kelly,0,1, -,Sean Kelly,0,1, Mohammad Nabi Ahmadzai,Mohammad Ahmadzai,0,1, Amanda and Jason Castellente,Amanda Castellente,0,1, -,Jason Castellente,0,1, Amy Wilkenson,Amy Wilkenson,0,1, Lindy Arsenault,Lindy Aresenault,0,1, Kristen and Kyser Blakely,Kristen Blakely,0,1, -,Kyser Blakely,0,1, Hayley and Chris Bernard,Hayley Bernard,0,1, -,Chris Bernard,0,1, Esther and Andrew Spear,Esther Spear,0,1, -,Andrew Spear,0,1, -,John Spear,1,0, Lily Gates and Jeff Carlson,Lily Gates,0,1, -,Jeff Carlson,0,1, Melanie and Christopher Wright,Melanie Wright,0,1, -,Christopher Wright,0,1, Forogh Kohestani,Forogh Kohestani,0,1, Rylie Munn and Artym Hayda,Rylie Munn,0,1, -,Artym Hayda,0,1, Nicole Archer,Nicole Archer,0,1, Baites Family,Phillip Baites,0,1, Baites Family,Carlton Baites,0,1, Gina Corelli,Gina Corelli,0,1, Gina Corelli,Fenn Reeder,0,1, Abigail Corpuz,Abigail Corpuz,0,1, Wes Coughlin,Wes Coughlin,0,1, Jack and Tess Durham,Jack Durham,0,1, -,Tess Durham,0,1, -,Baby Durham,1,1, Max Freitas,Max Freitas,0,1, Kevin Griffith and Jess,Kevin Griffith,0,1, -,Jess Port,0,0, Maria Howard,Maria Howard,0,1, Madeline Ingram,Madeline Ingram,0,1, Paul Kiekhaefer and Sarah,Paul Kiekhaefer,0,1, -,Sarah Poole,0,1, Kathryn King,Kathryn King,0,1, Hannah and Jenson Metcalf,Hannah Metcalf,0,1, -,Jenson Metcalf,0,1, Roman and Abbey Ojala,Roman Ojala,0,1, -,Abbey Ojala,0,1, Garret Pierce,Garret Pierce,0,1, Morgan Pincombe,Morgan Pincombe,0,1, Jackie and Mark Sawyer,Jackie Sawyer,0,1, -,Mark Sawyer,0,1, Dolly Taylor and Tyler Young,Dolly Taylor,0,1, -,Tyler Young,0,1, Robby Veronesi,Robby Veronesi,0,1, Colby and Sally ,Colby Zarger,0,1, -,Sally Tucker,0,1, Monique Rowell,Monique Rowell,0,1, Daina Robinson,Daina Robinson,0,1, Nic Sowatzke,Nic Sowatzke,0,1, Taek and Alissa Kim,Taek Kim,0,1, -,Alissa Kim,0,1, Kathleen Song,Kathleen Song,0,1, Jim Kerlee,Jim Kerlee,0,1, Deb and Steve Sweet,Deb Sweet,0,1, -,Steve Sweet,0,1, Randy and Mary Sundburg,Mary Sundburg,0,1, -,Randy Sundburg,0,1, Aunt Polly Wygant,Polly Wygant,0,1, Uncle Tom LaRoy,Tom LaRoy,0,1, Dale and Jeanette DePriest,Dale DePriest,0,1, -,Jeanette DePriest,0,1, Louis Olmstead,Louis Olmstead,0,1, Judy Wygant Collier,Judy Wygant Collier,0,1, Laruen and Kody Johnson,Lauren Johnson,0,1, -,Kody Johnson,0,1, The Rowes,Noelle Rowe,0,1, -,Rev Rowe,0,1, Katie Knoch and Sterling,Katie Knoch,0,1, -,Sterling Winters,0,1, Valerie Ceballos,Valerie Ceballos,0,1, Julia Beasley,Julia Beasley,0,1, Debbie,Debbie Cooley,0,1, -,GUEST,0,0, Madison,Madison Myers,0,1, The Myers,Brad Myers,0,1, -,Tisha Myers,0,1, -,Olivia Steele,0,1, Grandma Suzie,Suzie Moore,0,1, Grandma Sherry,Sherry Hobson,0,1, The Myers,Ralph Myers,0,1, -,Marge Myers,0,1, The Bughers,Rob Bugher,0,1, -,Teresa Bugher,0,1, The Days,David Day,0,1, -,Jim Coblantz,0,1, The Hobsons,Jasen Hobson,0,1, -,Jenna Hobson,0,1, -,Patrick Hobson,0,1, -,Brody Hobson,0,1, -,Graham Hobson,0,1, Carol Aders,Carol Aders,0,1, The Hartmans,Laura Hartman,0,1, -,Steve Hartman,0,1, The Courts,Janet Courts,0,1, -,Jim Courts,0,1, The Giffords,Keegan Gifford,0,1, -,Rebecca Gifford,0,1, The Sayeeds,Esam Sayeed,0,1, -,Victoria Sayeed,0,1, Alex Martakis,Alex Martakis,0,1, The Jefferies,Nick Jefferies,0,1, -,Molly Jefferies,0,1, The Giffords,Rob Gifford,0,1, -,Heather Gifford,0,1, The Larkins,Kyle Larkin,0,1, -,A.J. Larkin,0,1, Miranda Pressgrove,Miranda Pressgrove,0,1, The Penrods,Joe Pendrod,0,1, -,Kayelynn Penrod,0,1, The Maurices,Joshua Maurice,0,1, -,Averie Maurice,0,1, The Sulejmanis,Jamie Sulejmani,0,1, -,Musa Sulejmani,0,1, Jessica + Alexis Hopkins,Jessica Hopkins,0,1, -,Alexis Hopkins,0,1, Josh Shannonhouse,Josh Shannonhouse,0,1, Matt Sharp,Matt Sharp,0,1, Michael Rennaker,Michael Rennaker,0,1, The Millers,Ellie Miller,0,1, -,Christian Miller,0,1, Everette Mitchem,Everette Mitchem,0,1, The Winters,Jeremiah Winters,0,1, -,Kelsey Winters,0,1, The Grubers,Niko Gruber,0,1, -,Sarah Gruber,0,1, Morgan Fivecoate,Morgan Fivecoate,0,1, The Weimers,Alan Weimer,0,1, -,Madison Weimer,0,1, Phil Shaheen,Phil Shaheen,0,1, -,GUEST,0,1, Mitch Washburn,Mitch Washburn,0,1, Miles Lindgren,Miles Lindgren,0,1, -,Elyse Porter,0,1, The Dockery's,Aubrey Dockery,0,1, -,John Dockery,0,1, Aaron + Gwen Miller,Aaron Miller,0,1, -,Gwen Miller,0,1, Levi Dyches,Levi Dyches,0,1, -,Guy,0,1, Harley Bloecher,Harley Bloecher,0,1, -,Adriana,0,0, The Bloechers,Hunter Bloecher,0,1, -,Taylor Bloecher,0,1, The Millers,Paul Miller,0,1, -,Margot Miller,0,1, Libby + Brady,Libby Amaya,0,1, -,Brady Crowell,0,1, William Stewart,William Stewart,0,1, -,GUEST,0,0, Bailey Kormick and Alex,Bailey Kormick,0,1, -,Alex Zaroyan,0,1, Michaela Gulachek,Michaela Gulachek,0,1, The Smiths,Stacy Smith,0,1, -,Dale Smith,0,1, The Durrs,Barb Durr,0,1, -,Ronnie Durr,0,1, The Vaughns,Pam Vaughn,0,1, -,Jeff Vaughn,0,1, The Bradens,Robyn Braden,0,1, -,Hunter Braden,0,1, Cindy Heuermann and Darrick Gray,Cindy Heuermann,0,1, -,Darrick Gray,0,1, The Drakes,Steph Drake,0,1, -,Corey Drake,0,1, The Graffs,Cathy Graff,0,1, -,Terry Graff,0,1, The Bartlesons,Lynda Bartleson,0,1, -,Chris,0,1, Vanessa Bryant and Matt,Vanessa Bryant,0,1, -,Matt,0,0,"
  );
}

export async function linkGuestsToEvents(db: Database, eventNames: string[]) {
  // Get only the specified events from the database
  const events = await db
    .select()
    .from(schema.event)
    .where(inArray(schema.event.name, eventNames));
  const guests = await db.select().from(schema.guest);
  const existingAttendance = await db.select().from(schema.eventAttendance);

  const existingPairs = new Set(
    existingAttendance.map((record) => `${record.guestId}-${record.eventId}`)
  );

  for (const guest of guests) {
    for (const event of events) {
      const pairKey = `${guest.id}-${event.id}`;
      if (!existingPairs.has(pairKey)) {
        await db
          .insert(schema.eventAttendance)
          .values({
            guestId: guest.id,
            eventId: event.id,
            attending: "UNKNOWN",
          })
          .onConflictDoNothing();
      }
    }
  }
}
