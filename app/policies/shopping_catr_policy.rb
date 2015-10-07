class ShoppingCartPolicy < ApplicationPolicy

  def index?
    # binding.pry
    @user.admin? || @user.customer?
  end

  def create?
    @user.admin? || @user.customer?
  end

  def new?
    create?
  end

  def update?
    @user.admin? || @user.customer?
  end

  def edit?
    update?
  end

  def destroy?
    @user.admin? || @user.customer?
  end

  class Scope < Scope
    def resolve
      scope
    end
  end
end
