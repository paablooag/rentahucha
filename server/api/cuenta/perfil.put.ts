export default defineEventHandler(async (event) => {
  const user = await requireUser(event, 'inquilino')
  const p = validateTenantProfile(await readBody(event) ?? {})
  await query(
    `INSERT INTO tenant_profiles (user_id, employment, income, household, people, pets, move_date, stay, about, updated_at)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, now())
     ON CONFLICT (user_id) DO UPDATE SET employment = EXCLUDED.employment, income = EXCLUDED.income, household = EXCLUDED.household,
       people = EXCLUDED.people, pets = EXCLUDED.pets, move_date = EXCLUDED.move_date, stay = EXCLUDED.stay, about = EXCLUDED.about, updated_at = now()`,
    [user.id, p.employment, p.income, p.household, p.people, p.pets, p.moveDate, p.stay, p.about],
  )
  return { profile: await getTenantProfile(user.id) }
})
