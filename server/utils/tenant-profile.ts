export async function getTenantProfile(userId: string): Promise<TenantProfile | null> {
  return queryOne<TenantProfile>(
    `SELECT employment, income, household, people, pets, to_char(move_date, 'YYYY-MM-DD') AS move_date, stay, about
     FROM tenant_profiles WHERE user_id = $1`,
    [userId],
  )
}
