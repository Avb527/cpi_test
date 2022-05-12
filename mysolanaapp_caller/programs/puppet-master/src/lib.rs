// #region core
use anchor_lang::prelude::*;
use puppet::cpi::accounts::SetData;
use puppet::program::Puppet;

declare_id!("DTkJo67ZQcKnnFLLYT66vucdYpQccMZkyVq8NLQd781p");

#[program]
mod puppet_master {
    use super::*;
    pub fn pull_strings(ctx: Context<PullStrings>, method: String, url:String) -> anchor_lang::Result<()> {
        let cpi_program = ctx.accounts.puppet_program.to_account_info();
        let cpi_accounts = SetData {
            user: ctx.accounts.user.to_account_info(),
            system_program: ctx.accounts.system_program.to_account_info(),
        };
        let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);
        msg!("Inside puppet master");
        puppet::cpi::set_data(cpi_ctx, method, url)
    }
}

#[derive(Accounts)]
pub struct PullStrings<'info> {
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
    pub puppet_program: Program<'info, Puppet>,
}
// #endregion core
