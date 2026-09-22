export interface MasterRow {
  MissionID: string;
  SpacecraftID: string;
  SpacecraftName: string;
  MissionName: string;
  LaunchSite: string;
  LaunchDate: string;
  CommanderID: string;
  CommanderName: string;
  ExperimentID: string;
  ExperimentName: string;
  ExperimentType: string;
  GroundStationID: string;
  GroundStationName: string;
}

export const SPACE_MISSION_MASTER: MasterRow[] = [
  {
    MissionID: 'M001',
    SpacecraftID: 'SC101',
    SpacecraftName: 'Gaganyaan-1',
    MissionName: 'Human Spaceflight Test',
    LaunchSite: 'Sriharikota',
    LaunchDate: '2026-01-15',
    CommanderID: 'A101',
    CommanderName: 'Arjun Rao',
    ExperimentID: 'E201',
    ExperimentName: 'Life Support Test',
    ExperimentType: 'Human Spaceflight',
    GroundStationID: 'GS01',
    GroundStationName: 'Bengaluru'
  },
  {
    MissionID: 'M002',
    SpacecraftID: 'SC102',
    SpacecraftName: 'EOS-01',
    MissionName: 'Earth Observation Mission',
    LaunchSite: 'Sriharikota',
    LaunchDate: '2026-02-20',
    CommanderID: 'A102',
    CommanderName: 'Meera Nair',
    ExperimentID: 'E202',
    ExperimentName: 'Ocean Imaging',
    ExperimentType: 'Earth Observation',
    GroundStationID: 'GS02',
    GroundStationName: 'Hyderabad'
  },
  {
    MissionID: 'M003',
    SpacecraftID: 'SC103',
    SpacecraftName: 'NavIC-01',
    MissionName: 'Navigation Mission',
    LaunchSite: 'Sriharikota',
    LaunchDate: '2026-03-12',
    CommanderID: 'A103',
    CommanderName: 'Ravi Kumar',
    ExperimentID: 'E203',
    ExperimentName: 'Navigation Accuracy',
    ExperimentType: 'Navigation',
    GroundStationID: 'GS03',
    GroundStationName: 'Lucknow'
  },
  {
    MissionID: 'M004',
    SpacecraftID: 'SC104',
    SpacecraftName: 'Chandrayaan-Test',
    MissionName: 'Lunar Technology Mission',
    LaunchSite: 'Sriharikota',
    LaunchDate: '2026-04-18',
    CommanderID: 'A104',
    CommanderName: 'Ananya Das',
    ExperimentID: 'E204',
    ExperimentName: 'Lunar Imaging',
    ExperimentType: 'Lunar Exploration',
    GroundStationID: 'GS04',
    GroundStationName: 'Port Blair'
  },
  {
    MissionID: 'M005',
    SpacecraftID: 'SC105',
    SpacecraftName: 'Aditya-Test',
    MissionName: 'Solar Observation Mission',
    LaunchSite: 'Sriharikota',
    LaunchDate: '2026-05-10',
    CommanderID: 'A105',
    CommanderName: 'Vikram Singh',
    ExperimentID: 'E205',
    ExperimentName: 'Solar Wind Study',
    ExperimentType: 'Solar Science',
    GroundStationID: 'GS05',
    GroundStationName: 'Bengaluru'
  },
  {
    MissionID: 'M006',
    SpacecraftID: 'SC106',
    SpacecraftName: 'Gaganyaan-2',
    MissionName: 'Human Spaceflight Test',
    LaunchSite: 'Sriharikota',
    LaunchDate: '2026-06-25',
    CommanderID: 'A101',
    CommanderName: 'Arjun Rao',
    ExperimentID: 'E206',
    ExperimentName: 'Crew Health Study',
    ExperimentType: 'Human Spaceflight',
    GroundStationID: 'GS01',
    GroundStationName: 'Bengaluru'
  }
];

// Unseen dataset for final mission
export const SPACE_TELESCOPE_OBSERVATIONS = [
  { ObsID: 'OB101', TelescopeID: 'T01', TelescopeName: 'AstroSat-1', TargetID: 'TG55', TargetName: 'Crab Nebula', TargetCategory: 'Deep Space', AstronomerID: 'AST90', AstronomerName: 'Dr. Priya Sharma', ObservationDate: '2026-08-01', DataSizeGB: '45', QualityScore: '9.8' },
  { ObsID: 'OB102', TelescopeID: 'T01', TelescopeName: 'AstroSat-1', TargetID: 'TG88', TargetName: 'Andromeda Core', TargetCategory: 'Galaxy', AstronomerID: 'AST91', AstronomerName: 'Dr. K. Sivan', ObservationDate: '2026-08-03', DataSizeGB: '120', QualityScore: '9.5' },
  { ObsID: 'OB103', TelescopeID: 'T02', TelescopeName: 'HIMALAYA-O', TargetID: 'TG55', TargetName: 'Crab Nebula', TargetCategory: 'Deep Space', AstronomerID: 'AST90', AstronomerName: 'Dr. Priya Sharma', ObservationDate: '2026-08-10', DataSizeGB: '30', QualityScore: '8.9' },
  { ObsID: 'OB104', TelescopeID: 'T03', TelescopeName: 'SOLAR-EYE', TargetID: 'TG12', TargetName: 'Sunspot 3491', TargetCategory: 'Solar', AstronomerID: 'AST92', AstronomerName: 'Dr. Rahul Varma', ObservationDate: '2026-08-15', DataSizeGB: '85', QualityScore: '9.9' },
  { ObsID: 'OB105', TelescopeID: 'T01', TelescopeName: 'AstroSat-1', TargetID: 'TG12', TargetName: 'Sunspot 3491', TargetCategory: 'Solar', AstronomerID: 'AST92', AstronomerName: 'Dr. Rahul Varma', ObservationDate: '2026-08-20', DataSizeGB: '95', QualityScore: '9.4' }
];

export const DB_SYMBOLS = [
  { symbol: '→', name: 'Functional Dependency', meaning: 'X → Y means X functionally determines Y. If two tuples agree on X, they must agree on Y.', example: 'SpacecraftID → SpacecraftName' },
  { symbol: 'X⁺', name: 'Attribute Closure', meaning: 'The set of all attributes that can be functionally determined by attribute set X under functional dependencies F.', example: 'MissionID⁺ = {MissionID, SpacecraftID, MissionName, ...}' },
  { symbol: '⊆', name: 'Subset Of', meaning: 'Y ⊆ X means all attributes in set Y are contained within set X.', example: '{MissionID} ⊆ {MissionID, SpacecraftID}' },
  { symbol: '∪', name: 'Set Union', meaning: 'Combines two attribute sets into a single set containing all unique elements.', example: '{A, B} ∪ {B, C} = {A, B, C}' },
  { symbol: '{A, B}', name: 'Attribute Set', meaning: 'A composite grouping of attributes acting together as a determinant or key.', example: '{MissionID, ExperimentID}' },
  { symbol: 'PK', name: 'Primary Key', meaning: 'The candidate key chosen by the database designer to uniquely identify tuples in a relation.', example: 'MissionID in MISSION table' },
  { symbol: 'FK', name: 'Foreign Key', meaning: 'An attribute set in one relation that references the primary key of another relation.', example: 'GroundStationID in MISSION referencing GROUND_STATION' },
  { symbol: 'X ⊈ Y', name: 'Not a Subset', meaning: 'Used to define non-trivial functional dependencies where Y is not contained in X.', example: 'MissionName ⊈ MissionID' },
  { symbol: '⋈', name: 'Natural Join', meaning: 'Combines tuples from two relations on common attribute names, used to test lossless join property.', example: 'R1 ⋈ R2' },
  { symbol: 'X ↠ Y', name: 'Multivalued Dependency (Preview)', meaning: 'Optional preview: X determines a set of values for Y independently of other attributes. (Not a core 1NF-BCNF topic).', example: 'Course ↠ Teacher' }
];

export const DB_RULES = [
  { title: 'Atomicity Rule', text: 'Each attribute value in a relation cell must contain a single atomic value from its domain, not a list or set.' },
  { title: 'First Normal Form (1NF)', text: 'A relation is in 1NF if all attribute values are atomic and there are no repeating groups or multi-valued cells.' },
  { title: 'Superkey Definition', text: 'A set of attributes X is a superkey if X⁺ contains all attributes in the relation schema R.' },
  { title: 'Candidate Key Definition', text: 'A candidate key is a minimal superkey — no proper subset of it is a superkey.' },
  { title: 'Prime Attribute', text: 'An attribute is prime if it belongs to AT LEAST ONE candidate key of the relation.' },
  { title: 'Non-Prime Attribute', text: 'An attribute is non-prime if it does NOT belong to any candidate key.' },
  { title: 'Full Functional Dependency', text: 'Y is fully functionally dependent on X if X → Y holds and for any proper subset Z ⊂ X, Z → Y does NOT hold.' },
  { title: 'Partial Dependency', text: 'A non-prime attribute Y is partially dependent on candidate key K if X → Y holds for a proper subset X ⊂ K.' },
  { title: 'Second Normal Form (2NF)', text: 'A relation is in 2NF if it is in 1NF and no non-prime attribute is partially dependent on any candidate key.' },
  { title: 'Transitive Dependency', text: 'A dependency X → Z is transitive if there exists Y such that X → Y and Y → Z, where Y ⊈ X and Z ⊈ Y.' },
  { title: 'Third Normal Form (3NF)', text: 'A relation is in 3NF if for every non-trivial FD X → A, either X is a superkey OR A is a prime attribute.' },
  { title: 'Boyce-Codd Normal Form (BCNF)', text: 'A relation is in BCNF if for every non-trivial FD X → Y, X is a superkey of the relation.' },
  { title: 'Lossless Join Condition', text: 'Decomposition of R into R1 and R2 is lossless if (R1 ∩ R2) → R1 OR (R1 ∩ R2) → R2 in F⁺.' },
  { title: 'Dependency Preservation', text: 'Decomposition preserves dependencies if the union of functional dependencies in decomposed relations (F1 ∪ F2)⁺ equals F⁺.' }
];

export const FLASHCARDS_DATA = [
  { term: 'Atomic Domain', def: 'Cells contain single indivisible values for the relation context.', example: 'SpacecraftID SC101 (not SC101, SC102 in one cell)', mistake: 'Thinking atomic means physically indivisible characters.' },
  { term: '1NF (First Normal Form)', def: 'Atomic cell values and no repeating groups.', example: 'Splitting multi-valued experiments into separate rows.', mistake: 'Thinking 1NF eliminates duplicate rows.' },
  { term: 'Superkey', def: 'Set of attributes that uniquely identifies every tuple in a relation.', example: '{MissionID, ExperimentID, CommanderID} in SPACE_MISSION_MASTER', mistake: 'Assuming superkey must be minimal.' },
  { term: 'Candidate Key', def: 'Minimal superkey with no unnecessary attributes.', example: '{MissionID, ExperimentID} in MISSION_EXPERIMENT table', mistake: 'Confusing candidate key with primary key.' },
  { term: 'Prime Attribute', def: 'An attribute that is part of at least one candidate key.', example: 'MissionID in composite key {MissionID, ExperimentID}', mistake: 'Thinking prime attributes only come from the chosen primary key.' },
  { term: 'Non-Prime Attribute', def: 'An attribute that is not part of any candidate key.', example: 'CommanderName in SPACE_MISSION_MASTER', mistake: 'Assuming non-prime attributes cannot be determinants.' },
  { term: 'Functional Dependency', def: 'Constraint where determinant X uniquely determines dependent Y (X → Y).', example: 'CommanderID → CommanderName', mistake: 'Inferring FDs solely from sample dataset rows.' },
  { term: 'Trivial Dependency', def: 'FD X → Y where dependent Y is a subset of determinant X.', example: '{MissionID, SpacecraftID} → MissionID', mistake: 'Thinking trivial FDs violate normal forms.' },
  { term: 'Partial Dependency', def: 'A non-prime attribute depending on only part of a composite candidate key.', example: 'ExperimentID → ExperimentName when key is {MissionID, ExperimentID}', mistake: 'Looking for partial dependencies when candidate key has 1 attribute.' },
  { term: 'Full Functional Dependency', def: 'Y depends on the entire candidate key X, not on any subset of X.', example: '{MissionID, ExperimentID} → ExperimentResult', mistake: 'Assuming single-attribute keys can have partial dependencies.' },
  { term: 'Transitive Dependency', def: 'X → Y and Y → Z causing X to determine Z through non-key Y.', example: 'MissionID → GroundStationID → GroundStationName', mistake: 'Confusing transitive dependencies with foreign key lookups.' },
  { term: 'Armstrong’s Axioms', def: 'Fundamental inference rules: Reflexivity, Augmentation, Transitivity.', example: 'If MissionID → GroundStationID & GroundStationID → Name => MissionID → Name', mistake: 'Treating Union & Decomposition as basic axioms instead of derived rules.' },
  { term: 'Attribute Closure (X⁺)', def: 'All attributes functionally determined by attribute set X.', example: 'CommanderID⁺ = {CommanderID, CommanderName}', mistake: 'Stopping closure calculation early before checking all FDs.' },
  { term: 'Minimal Cover', def: 'Equivalent set of FDs with single RHS, no extraneous LHS, and no redundant FDs.', example: 'Removing MissionID → SpacecraftName if SpacecraftID → SpacecraftName exists.', mistake: 'Deleting dependencies that alter the logical equivalence of F.' },
  { term: '2NF (Second Normal Form)', def: '1NF + no non-prime attribute partially dependent on candidate key.', example: 'Separating EXPERIMENT(ExperimentID, ExperimentName) from composite table.', mistake: 'Believing 2NF eliminates transitive dependencies.' },
  { term: '3NF (Third Normal Form)', def: '2NF + for every non-trivial X → A, X is superkey OR A is prime.', example: 'Separating GROUND_STATION(GroundStationID, GroundStationName).', mistake: 'Thinking 3NF forbids prime attributes on RHS of non-superkey determinant.' },
  { term: 'BCNF (Boyce-Codd NF)', def: 'For EVERY non-trivial FD X → Y, X MUST be a superkey.', example: 'Decomposing MISSION_CREW when AstronautRole → AstronautID violates superkey rule.', mistake: 'Assuming 3NF and BCNF are identical.' },
  { term: 'Lossless-Join Decomposition', def: 'Joining decomposed tables yields exact original table with zero spurious rows.', example: 'R1 ⋈ R2 = R without fake mission records.', mistake: 'Assuming any table split is automatically lossless.' },
  { term: 'Dependency Preservation', def: 'All original functional dependencies can be enforced in decomposed tables without joins.', example: 'Enforcing X → Y inside R1 and Y → Z inside R2.', mistake: 'Thinking losslessness guarantees dependency preservation.' }
];

export const COMMON_MISTAKES = [
  { wrong: '❌ "1NF means there are no duplicate rows."', right: '1NF concerns atomic values and absence of repeating/multivalued groups; tuple uniqueness is enforced by candidate keys.' },
  { wrong: '❌ "2NF means every attribute depends on the primary key."', right: '2NF is defined using candidate keys and specifically forbids PARTIAL dependency of non-prime attributes on any candidate key.' },
  { wrong: '❌ "If a table has a single-attribute candidate key, it can never satisfy 2NF."', right: 'Without a composite candidate key, partial dependency cannot occur! Therefore, any 1NF table with a single-attribute candidate key automatically satisfies 2NF.' },
  { wrong: '❌ "3NF means there can be no transitive dependency of any kind."', right: 'The formal 3NF rule permits X → A if A is a PRIME attribute, even if X is not a superkey.' },
  { wrong: '❌ "BCNF and 3NF are exactly the same."', right: 'BCNF is stricter than 3NF. BCNF requires determinant X to be a superkey for ALL non-trivial FDs, whereas 3NF allows prime RHS attributes.' },
  { wrong: '❌ "Every decomposition is lossless."', right: 'Losslessness must be mathematically proven. Splitting tables on non-key attributes produces fake/spurious joined tuples.' },
  { wrong: '❌ "Functional dependencies come from the sample data values."', right: 'Functional dependencies represent real-world business constraints and semantics. Sample rows can only disprove FDs, never prove them.' },
  { wrong: '❌ "A primary key and candidate key are completely different concepts."', right: 'A primary key is simply ONE candidate key selected by the DBA. All primary keys are candidate keys.' }
];
