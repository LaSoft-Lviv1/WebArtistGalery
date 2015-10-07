class AuthorPolicy < ApplicationPolicy

  def create?
    @user.admin? || @user.artist?
  end

  def new?
    create?
  end

  def update?
    @user.admin? || (@user.artist? && @user.artist.id == @record.id)
  end

  def edit?
    update?
  end

  def destroy?
    @user.admin? || (@user.artist? && @user.artist.id == @record.id)
  end

  class Scope < Scope
    def resolve
      scope
    end
  end
end
