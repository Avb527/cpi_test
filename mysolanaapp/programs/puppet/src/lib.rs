use anchor_lang::prelude::*;

declare_id!("AUS3hFAVWR5AgohVHUqNSpmGo1KqdyKSvgsySzNYNAtR");

#[program]
pub mod puppet {
    use super::*;
    pub fn initialize(_ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }

    pub fn set_data(ctx: Context<SetData>, method: String, url:String) -> Result<()> {
        msg!("Inside puppet");
        msg!(&method);
        msg!(&url);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct SetData<'info> {
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

