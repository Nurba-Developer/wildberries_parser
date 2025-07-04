"""Add category_id to Product

Revision ID: df25dd9a9bb8
Revises: e29f11d4b323
Create Date: 2025-06-27 17:41:08.477403

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'df25dd9a9bb8'
down_revision: Union[str, None] = 'e29f11d4b323'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('products', sa.Column('category_id', sa.Integer(), nullable=True))
    op.alter_column('products', 'name',
               existing_type=sa.VARCHAR(),
               nullable=False)
    op.alter_column('products', 'price',
               existing_type=sa.INTEGER(),
               nullable=False)
    op.alter_column('products', 'brand_id',
               existing_type=sa.INTEGER(),
               nullable=False)
    op.create_foreign_key(None, 'products', 'categories', ['category_id'], ['id'])
    # ### end Alembic commands ###


def downgrade() -> None:
    """Downgrade schema."""
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'products', type_='foreignkey')
    op.alter_column('products', 'brand_id',
               existing_type=sa.INTEGER(),
               nullable=True)
    op.alter_column('products', 'price',
               existing_type=sa.INTEGER(),
               nullable=True)
    op.alter_column('products', 'name',
               existing_type=sa.VARCHAR(),
               nullable=True)
    op.drop_column('products', 'category_id')
    # ### end Alembic commands ###
