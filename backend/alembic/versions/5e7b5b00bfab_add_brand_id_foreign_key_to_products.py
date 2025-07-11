"""Add brand_id foreign key to products

Revision ID: 5e7b5b00bfab
Revises: 40e3dbf41763
Create Date: 2025-06-27 18:07:56.812549

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '5e7b5b00bfab'
down_revision: Union[str, None] = '40e3dbf41763'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('products', 'brand_id',
               existing_type=sa.INTEGER(),
               nullable=False)
    # ### end Alembic commands ###


def downgrade() -> None:
    """Downgrade schema."""
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('products', 'brand_id',
               existing_type=sa.INTEGER(),
               nullable=True)
    # ### end Alembic commands ###
